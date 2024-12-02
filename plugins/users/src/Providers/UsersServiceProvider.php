<?php

namespace Plugins\Users\Providers;

use Illuminate\Support\ServiceProvider;

class UsersServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Registrar serviços do plugin
        $this->mergeConfigFrom(__DIR__.'/../../config/users.php', 'users');
    }

    public function boot()
    {
        // Carregar rotas
        $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
        
        // Carregar views
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'users');
        
        // Carregar migrations
        $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');
        
        // Publicar assets se necessário
        $this->publishes([
            __DIR__.'/../../resources/js' => resource_path('js/plugins/users'),
        ], 'users-assets');
    }
}
