import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, DefineComponent, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// Quasar
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import 'quasar/dist/quasar.css';

// FormKit
import { plugin as formkitPlugin, defaultConfig } from '@formkit/vue';
import { createProPlugin, inputs } from '@formkit/pro';
import { genesisIcons } from '@formkit/icons';
import '@formkit/themes/genesis';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(Quasar, {
                plugins: {},
                config: {
                    brand: {
                        primary: '#1976D2',
                        secondary: '#26A69A',
                        accent: '#9C27B0',
                        dark: '#1D1D1D',
                        positive: '#21BA45',
                        negative: '#C10015',
                        info: '#31CCEC',
                        warning: '#F2C037'
                    }
                }
            })
            .use(formkitPlugin, defaultConfig({
                icons: {
                    ...genesisIcons
                },
                config: {
                    classes: {
                        input: 'formkit-input',
                        label: 'formkit-label',
                        messages: 'formkit-messages',
                        message: 'formkit-message',
                        wrapper: 'formkit-wrapper',
                        help: 'formkit-help',
                        inner: 'formkit-inner',
                        prefix: 'formkit-prefix',
                        suffix: 'formkit-suffix'
                    }
                }
            }))
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
