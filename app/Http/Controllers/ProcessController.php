<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Event;
use App\Models\Process;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcessController extends Controller
{
    public function startBufferRecord(Camera $camera)
    {
        $descriptorspec = array(
            0 => array("pipe", "r"),
            1 => array("pipe", "w"),
            2 => array("pipe", "w")
        );
        $cwd = app_path('bin');


        $path = app_path('bin');
        $command = $path . "/startBufferRecord $camera->ip_address";
        $process = proc_open($command, $descriptorspec, $pipes, $cwd);

        $proc = Process::create([
            'camera_id' => $camera->id,
            'command' => "startBufferRecord",
            'running' => proc_get_status($process)['running'],
            'p_id' => proc_get_status($process)['pid']
        ]);
        return $proc;
    }
    public function destroy($p_id)
    {
        Process::where('p_id', $p_id)->delete();
        posix_kill($p_id, 9);
        posix_kill($p_id + 1, 9);
    }

    public function concateBuffer(Request $request)
    {
        if (Process::where("command", "concateBuffer")->exists())
            return true;
        else {
            $descriptorspec = array(
                0 => array("pipe", "r"),
                1 => array("pipe", "w"),
                2 => array("pipe", "w")
            );
            $cwd = app_path('bin');
            
            $path = app_path('bin');
            $command = $path . "/concateBuffer";
            $process = proc_open($command, $descriptorspec, $pipes, $cwd);

            $proc = Process::create([
                'command' => "concateBuffer",
                'running' => proc_get_status($process)['running'],
                'p_id' => proc_get_status($process)['pid']
            ]);
            return $proc;
        }
    }
    public function triggerEvent(Request $request)
    {
        //hole die mitgelieferte id oder breche ab
        $cam_id = $request->cam_id ?? Camera::first()->id;
        $event_id = Event::orderByDesc('id')->first()->id + 1;

        $ftokfile = app_path('bin') . "/concate_MSGQ";

        if (($key = ftok($ftokfile, "A")) == -1)
            die("ftok");

        /* Connect to message queue */
        if (!msg_queue_exists($key))
            die("message queue doesn't exist");

        if (($msqid = msg_get_queue($key)) === FALSE)
            die("msg_get_queue");


        if (!msg_send($msqid, 12, "CONCATE_$cam_id" . "_$event_id\0", false))
            die("msg_send");

        return "sent: CONCATE_$cam_id" . "_$event_id\0";
    }
}
