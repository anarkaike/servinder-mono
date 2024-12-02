<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->prefix('users')->group(function () {
    Route::get('/', function () {
        return inertia('Users/Index');
    })->name('users.index');
});
