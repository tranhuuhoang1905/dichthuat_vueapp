<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#4285f4" />
    <meta name="csrf-token" value="{{ csrf_token() }}"/>
    <title>Project Quản Lý Dự Án Gosu</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css">
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet"/>
    <!-- <link href="{{ asset('css/vue/app.9c3ca523.css') }}" type="text/css" rel="stylesheet"/> -->
    <!-- <link href="{{ asset('css/vue/chunk-4c6835bb.7d8f679c.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/vue/chunk-2579fc8c.3b0b8bc4.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/vue/chunk-4db4931d.2ed4eb9d.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/vue/chunk-7fd45869.c9126f35.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/vue/chunk-63035b0e.089bd05c.css') }}" type="text/css" rel="stylesheet"/>
    <link href="{{ asset('css/vue/chunk-vendors.cc30c5cb.css') }}" type="text/css" rel="stylesheet"/> -->
    <style>
        .bg-light {
            background-color: #eae9e9 !important;
        }
    </style>
</head>
<body>
<div id="app">
</div>
<script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
</body>
</html>