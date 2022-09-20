<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Event;
use Illuminate\Http\Request;


class EventController extends Controller
{
    public function show(Request $request)
    {
        $date = date('Y-m-d', time());
        if ($request->date != null) {
            $date = date('Y-m-d', strtotime($request->date));
        }
        $date2 = strtotime($date);
        $date2 = date('Y-m-d', $date2 + (24 * 60 * 60));

        return ["$date", Event::where('created_at', ">", $date)->where('created_at', "<", $date2)->get()];
    }

    public function index(Event $event)
    {
        return [asset("storage" . substr($event->path, strpos($event->path, "/cameras") + strlen("/cameras"))), $event->created_at];
    }

    public function getLastEvent(Camera $camera)
    {
        $lastEvent = Event::where('camera_id', $camera->id)->orderByDesc('id')->first();
        if ($lastEvent == null)
            die("keine Events für Kamera $camera->ip_address");
        return [asset("storage" . substr($lastEvent->path, strpos($lastEvent->path, "/cameras") + strlen("/cameras"))), $lastEvent->created_at];
    }

    public function dates()
    {
        $arr = [];
        foreach (Event::where('created_at', '>', '0')->orderBy('created_at', 'desc')->pluck('created_at') as $event) {
            array_push($arr, date('Y-m-d', strtotime($event)));
        }

        return array_unique($arr);
    }
}
