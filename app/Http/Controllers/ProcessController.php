<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Event;
use App\Models\Process;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ProcessController extends Controller
{
    public function index()
    {
        return Process::all();
    }

    public function show(Camera $camera)
    {
        return Process::where('camera_id', $camera->id)->first();
    }

    public function startBufferRecord(Camera $camera)
    {

        $descriptorspec = array(
            0 => array("pipe", "r"),
            1 => array("pipe", "w"),
            2 => array("pipe", "w")
        );
        $cwd = getcwd();
        $path = app_path('bin');
        $command = $path . "/startBufferRecord $camera->ip_address";

        $process = proc_open($command, $descriptorspec, $pipes, $cwd);
        $p_id = proc_get_status($process)['pid'];
        if (proc_get_status($process)['running'] == "true") {
            $c_p_id = 0;
            while ($c_p_id == 0) {
                usleep(2500);
                $c_p_id = intval(shell_exec("pgrep -P $p_id"));
            }

            $created_process = Process::create([
                'camera_id' => $camera->id,
                'command' => "startBufferRecord",
                'c_p_id' => $c_p_id,
                'p_id' => $p_id
            ]);
            if (Process::where('command', "concateBuffer")->get()->count() == 0) {
                $this->concateBuffer();
            }
            return $created_process;
        } else {
            return "couldn't start process";
        }
    }

    public function stopBufferRecord(Camera $camera)
    {
        $process = $this->show($camera);
        posix_kill($process->c_p_id, 9);
        posix_kill($process->p_id, 9);

        $process->delete();
        if (Process::all()->count() == 1) {
            if ($concateProcess = Process::where('command', "concateBuffer")->first()) {
                sleep(30);
                posix_kill($concateProcess->p_id, 9);
                $concateProcess->delete();
                return $concateProcess;
            }
        }
        //clear the buffer 
    }

    public function concateBuffer()
    {
        if (Process::where("command", "concateBuffer")->exists())
            return true;
        else {
            $descriptorspec = array(
                0 => array("pipe", "r"),
                1 => array("pipe", "w"),
                2 => array("pipe", "w")
            );
            $cwd = getcwd();

            $path = app_path('bin');
            $command = $path . "/concateBuffer";


            $process = proc_open($command, $descriptorspec, $pipes, $cwd);

            return Process::create([
                'command' => "concateBuffer",
                'p_id' => proc_get_status($process)['pid']
            ]);
        }
    }
    public function triggerEvent(Camera $camera)
    {
        if(!Process::where('camera_id',$camera->id)->exists())
            die("camera buffer not running");
        if(!Process::where('command',"concateBuffer")->exists())
            die("concateBuffer not running");

        $event = Event::create([
            'camera_id' => $camera->id,
            'eventtype_id' => 1,
        ]);

        $ftokfile = app_path('bin') . "/concate_MSGQ";

        if (($key = ftok($ftokfile, "A")) == -1)
            die("ftok");

        /* Connect to message queue */
        if (!msg_queue_exists($key))
            die("message queue doesn't exist");

        if (($msqid = msg_get_queue($key)) === FALSE)
            die("msg_get_queue");


        if (!msg_send($msqid, 12, "CONCATE_$camera->id" . "_$event->id\0", false))
            die("msg_send");

        return "sent: CONCATE_$camera->id" . "_$event->id\0" . " ftok: $key";
    }
}
