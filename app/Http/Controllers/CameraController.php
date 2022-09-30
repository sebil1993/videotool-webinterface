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

    public function discover()
    {
        // Die SOAP-Anfrage welche an die Kamera geschickt wird.
        // $post_string = '<s:Envelope    xmlns:a="http://www.w3.org/2005/08/addressing"    xmlns:d="http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01"    xmlns:i="http://printer.example.org/2003/imaging"    xmlns:s="http://www.w3.org/2003/05/soap-envelope" >  <s:Header>    <a:Action>      http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01/Probe    </a:Action>    <a:MessageID>      urn:uuid:0a6dc791-2be6-4991-9af1-454778a1917a    </a:MessageID>    <a:To>urn:docs-oasis-open-org:ws-dd:ns:discovery:2009:01</a:To>  </s:Header>  <s:Body>    <d:Probe>      <d:Types>i:PrintBasic</d:Types>      <d:Scopes   MatchBy="http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01/ldap" >        ldap:///ou=engineering,o=examplecom,c=us      </d:Scopes>    </d:Probe>  </s:Body></s:Envelope>';
        $post_string = '<?xml version="1.0" encoding="UTF-8"?>
        <e:Envelope xmlns:e="http://www.w3.org/2003/05/soap-envelope" xmlns:w="http://schemas.xmlsoap.org/ws/2004/08/addressing"
            xmlns:d="http://schemas.xmlsoap.org/ws/2005/04/discovery" xmlns:dn="http://www.onvif.org/ver10/network/wsdl">
            <e:Header>
            <w:Action a:mustUnderstand="true">http://schemas.xmlsoap.org/ws/2005/04/discovery/Probe</w:Action>
                <w:MessageID>uuid:84ede3de-7dec-11d0-c360-f01234567890</w:MessageID>
                <w:To e:mustUnderstand="true">urn:schemas-xmlsoap-org:ws:2005:04:discovery</w:To>
            </e:Header>
            <e:Body>
            <d:Probe>
                <d:Types>dn:NetworkVideoTransmitter</d:Types>
            </d:Probe>
            </e:Body>
        </e:Envelope>';


        //"<a:Action>http://docs.oasis-open.org/ws-dd/ns/discovery/2009/01/Hello</a:Action>"

        // Multicast Adresse zum Lokalisieren der verfügbaren IP-Kameras
        $mcastAdress = "239.255.255.250";
        // Multicast Port, typischerweise 1900 / 3702
        $mcastPort = "3702";
        // Erstellen eines Sockets (Domain, Type, Protocol)
        $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
        // Anbinden des Sockets $sock an 0.0.0.0 mit random Port (20000-40000)
        socket_bind($sock, "0.0.0.0", rand(20000, 40000));
        // Stellt Optionen für Socket ein
        socket_set_option($sock, IPPROTO_IP, MCAST_JOIN_GROUP, ['group' => $mcastAdress]);
        // Sended $post_string and $sock mit remote-host $mcastAdress
        socket_sendto($sock, $post_string, strlen($post_string), 0, $mcastAdress, "3702");

        $sock_read = array($sock);
        socket_recvfrom($sock, $response, 9999, 0, $mcastAdress, $mcastPort);
        $ip_adresses = array();
        while (socket_select($sock_read, $sock_write, $sock_except, 1) > 0) {
            socket_recvfrom($sock, $response, 9999, 0, $from, $mcastPort);
            echo $response, "<br>";
            array_push($ip_adresses, $from);
            sleep(1);
        }

        socket_close($sock);
        // dd(array_unique($ip_adresses, SORT_STRING));
    }
}
