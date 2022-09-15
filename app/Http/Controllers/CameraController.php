<?php

namespace App\Http\Controllers;

use App\Models\Camera;
use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CameraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Camera::all();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Camera  $camera
     * @return \Illuminate\Http\Response
     */
    public function show(Camera $camera)
    {
        return Camera::where('id', $camera->id)->get();
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Camera  $camera
     * @return \Illuminate\Http\Response
     */
    public function destroy(Camera $camera)
    {
        $camera->delete();
    }


    public function initCamera(Request $request)
    {
        $path = app_path('bin');

        exec($path . "/initCamera $request->ip_address $request->username $request->password", $output, $resultcode);
        return $output;
    }
    public function trytry()
    {
        return asset('storage/event_id_6.mp4');
    }
    // public function getPlaylistStream(Camera $camera)
    // {
    //     $lastEvent = Event::where('camera_id', $camera->id)->orderByDesc('id')->first();
    //     if ($lastEvent == null)
    //         die("keine Events für Kamera $camera->ip_address");
    //     return asset("storage" . substr($lastEvent->path, strpos($lastEvent->path, "/cameras") + strlen("/cameras")));
    // }
}
