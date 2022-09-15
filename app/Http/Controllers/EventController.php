<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function show(Request $request)
    {
        // return time('1 hour');
        $date = date('Y-m-d');
        if ($request->days != null)
            $date = (date('Y-m-d', time() + (24 * 60 * 60 * $request->days)));
        // return $date;
        // return date('Y-m-d H:i:s', time() + $time);
        return [Event::where('created_at', ">", $date)->get()];
    }
    public function getLastEvent(Camera $camera)
    {
        $lastEvent = Event::where('camera_id', $camera->id)->orderByDesc('id')->first();
        if ($lastEvent == null)
            die("keine Events für Kamera $camera->ip_address");
        return [asset("storage" . substr($lastEvent->path, strpos($lastEvent->path, "/cameras") + strlen("/cameras"))), $lastEvent->created_at];
    }
}
