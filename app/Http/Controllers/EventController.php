<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function getLastEvent(Camera $camera)
    {
        $lastEvent = Event::where('camera_id', $camera->id)->orderByDesc('id')->first();
        if($lastEvent == null)
            die("keine Events für Kamera $camera->ip_address");
        return asset("storage".substr($lastEvent->path,strpos($lastEvent->path,"/cameras")+strlen("/cameras")));
    }
}
