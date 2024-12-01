<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Services\PluginManager;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Carregar plugins automaticamente
        $pluginManager = new PluginManager();
        $pluginManager->loadPlugins();
        Vite::prefetch(concurrency: 3);
    }
}
