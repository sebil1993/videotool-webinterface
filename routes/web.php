<?php

use App\Http\Controllers\CameraController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\ProcessController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('cameras', [CameraController::class, "index"]);
Route::post('cameras/init', [CameraController::class, "initCamera"]);
Route::get('cameras/{camera}', [CameraController::class, "show"]);
Route::delete('cameras/{camera}', [CameraController::class, "destroy"]);


Route::get('processes', [ProcessController::class, "index"]);

Route::get('processes/{camera}/stop', [ProcessController::class, "stopBufferRecord"]);
Route::get('processes/{camera}/start', [ProcessController::class, "startBufferRecord"]);
Route::get('processes/{camera}/trigger', [ProcessController::class, "triggerEvent"]);

Route::get('stoppo/{camera}', [ProcessController::class, "stoppo"]);

Route::get('events', [EventController::class, "show"]);
Route::get('events/dates', [EventController::class, "dates"]);
Route::get('events/{event}', [EventController::class, "index"]);
Route::get('events/{camera}/last', [EventController::class, "getLastEvent"]);


// Route::get('events/{camera}', [EventController::class, "getLastEvent"]);
// Route::get('concatebuffer', [ProcessController::class, "concateBuffer"]);
// Route::get('events/{camera}', [CameraController::class, "getLastEvent"]);
