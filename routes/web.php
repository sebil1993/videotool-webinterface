<?php

use App\Http\Controllers\CameraController;
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

Route::get('startbuffer/{camera}', [ProcessController::class, "startBufferRecord"]);
Route::get('stopbuffer/{process}', [ProcessController::class, "destroy"]);
// Route::get('cameras/init/mait', [CameraController::class, "triggerEvent"]);
