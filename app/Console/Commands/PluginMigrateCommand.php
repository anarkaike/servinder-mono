<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Finder\Finder;

class PluginMigrateCommand extends Command
{
    protected $signature = 'plugin:migrate {--fresh} {--seed}';
    protected $description = 'Run migrations for all plugins';

    public function handle()
    {
        $pluginPath = base_path('plugins');
        $migrationPaths = [];

        $finder = new Finder();
        $finder->directories()->in($pluginPath)->depth('== 2')->name('migrations');

        foreach ($finder as $dir) {
            $migrationPaths[] = $dir->getRealPath();
        }

        if ($this->option('fresh')) {
            Artisan::call('migrate:fresh', ['--force' => true]);
        }

        foreach ($migrationPaths as $path) {
            Artisan::call('migrate', [
                '--path' => $path,
                '--force' => true
            ]);
        }

        if ($this->option('seed')) {
            Artisan::call('db:seed', ['--force' => true]);
        }

        $this->info('Plugin migrations completed successfully.');
    }
}
