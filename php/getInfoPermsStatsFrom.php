/**
 * @example: echo getInfoPermsStatsFrom($arquivo, true, 'America/Sao_Paulo');
 */
function getInfoPermsStatsFrom($path, $friendlyTimeConvertion = false, $timeZone){
    if ($timeZone) {
        date_default_timezone_set($timeZone);
    }

    $retPerms = array(
        "chmod"       => substr(sprintf('%o', fileperms($path)), -4),
        "permissions" => fileperms($path),
        "readable"    => is_readable($path),
        "writable"    => is_writable($path),
        "executable"  => is_executable($path),
    );

    $stats    = stat($path);
    $retStats = array();
    foreach ($stats as $key => $value) {
        if (!is_numeric($key)) {
            if ($friendlyTimeConvertion && in_array($key, ['atime', 'ctime', 'mtime'])) {
                $value = date('Y-m-d H:i:s', $value);
            }
            $retStats[$key] = $value;
        }
    }

    return json_encode(array_merge($retPerms, $retStats), JSON_PRETTY_PRINT);
}
