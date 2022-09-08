<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Camera extends Model
{
    use HasFactory;
    protected $table = 'cameras';
    protected $fillable = [
        'ipaddress',
        'username',
        'password',
        'manufacturer',
        'model',
        'serialnumber',
        'stream_uri',
        'snapshot_uri'
    ];
    protected $visible = [
        'id',
        'ipaddress',
        'username',
        'manufacturer',
        'model',
        'serialnumber',
        'stream_uri',
        'snapshot_uri'
    ];
}