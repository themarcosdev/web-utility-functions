<?php

function ipInRange($ip, $ranges) {
    // Convert the IP to a long format
    $ipLong = ip2long($ip);

    foreach ($ranges as $range) {
        list($subnet, $bits) = explode('/', $range);
        $subnetLong = ip2long($subnet);
        $mask = -1 << (32 - $bits);
        
        // Check if the IP is within the range
        if (($ipLong & $mask) == ($subnetLong & $mask)) {
            return true;
        }
    }
    return false;
}

// List of Cloudflare IP ranges:
// https://www.cloudflare.com/pt-br/ips/
$cloudflareRanges = [
    "173.245.48.0/20",
    "103.21.244.0/22",
    "103.22.200.0/22",
    "103.31.4.0/22",
    "141.101.64.0/18",
    "108.162.192.0/18",
    "190.93.240.0/20",
    "188.114.96.0/20",
    "197.234.240.0/22",
    "198.41.128.0/17",
    "162.158.0.0/15",
    "104.16.0.0/13",
    "104.24.0.0/14",
    "172.64.0.0/13",
    "131.0.72.0/22",
];

// Example usage
$ipToCheck = $_GET['check_ip'] ?? '172.71.11.75';

header('Content-Type: application/json');
if (ipInRange($ipToCheck, $cloudflareRanges)) {
    echo json_encode(["ip" => "$ipToCheck", "status" => "ok"]);
} else {
    echo json_encode(["ip" => "$ipToCheck", "status" => "not-ok"]);
}

?>
