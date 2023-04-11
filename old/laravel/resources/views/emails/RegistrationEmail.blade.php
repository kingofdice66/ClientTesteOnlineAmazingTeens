<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>Bine ai venit {{ $emailData['username'] }}</h1>
    <h1>Token-ul este: {{ $emailData['token'] }}</h1>
    <h1>Atentie! Aceasta notificare expira dupa 30 de minute</h1>
    <h1>Da click pe link-ul de mai jost pentru autentificare: </h1><br />
    <a href="https://www.google.com"></a>
</body>

</html>
