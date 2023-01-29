<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::get('/403', function () {
    return "you don't have permission to access this";
})->name('login');

Route::view('/{path}', 'app')->where('path', '.*');
