$m2 = "C:/Users/swapn/.m2/repository"
$jars = Get-ChildItem -Path $m2 -Filter "*.jar" -Recurse | Where-Object { 
    $_.FullName -notmatch "slf4j-api-1\." -and 
    $_.FullName -notmatch "slf4j-simple" -and 
    $_.FullName -notmatch "slf4j-nop" -and 
    $_.FullName -notmatch "slf4j-jdk" 
} | Select-Object -ExpandProperty FullName | ForEach-Object { $_.Replace("\", "/") }

$cp = ($jars + "target/classes") -join ";"

$files = Get-ChildItem -Recurse -Path "src/main/java" -Filter "*.java" | Select-Object -ExpandProperty FullName | ForEach-Object { $_.Replace("\", "/") }

$lines = @()
$lines += "-parameters"
$lines += "-source"
$lines += "21"
$lines += "-target"
$lines += "21"
$lines += "-cp"
$lines += "`"$cp`""
$lines += "-d"
$lines += "target/classes"
foreach ($f in $files) {
    $lines += "`"$f`""
}

$optFile = "target/options.txt"
[System.IO.File]::WriteAllLines($optFile, $lines)
javac "@$optFile"
