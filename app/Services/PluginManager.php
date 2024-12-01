<?php

namespace App\Services;

use Illuminate\Support\Facades\File;

class PluginManager
{
    protected $pluginsPath;
    protected $plugins = [];

    public function __construct()
    {
        $this->pluginsPath = base_path('plugins');
    }

    public function loadPlugins()
    {
        if (!File::exists($this->pluginsPath)) {
            return;
        }

        $plugins = File::directories($this->pluginsPath);

        foreach ($plugins as $pluginPath) {
            $this->loadPlugin($pluginPath);
        }

        return $this->plugins;
    }

    protected function loadPlugin($path)
    {
        $configFile = $path . '/plugin.json';
        
        if (!File::exists($configFile)) {
            return;
        }

        $config = json_decode(File::get($configFile), true);
        
        if (!$config) {
            return;
        }

        $this->registerPluginProviders($config['providers'] ?? []);
        $this->plugins[] = $config;
    }

    protected function registerPluginProviders(array $providers)
    {
        foreach ($providers as $provider) {
            app()->register($provider);
        }
    }
}
