import { definePreset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';

const MyPreset = definePreset(Nora, {
    semantic: {
        primary: {
            50: '#D9D1DA',
            100: '#D0C5D0',
            200: '#BDAFBE',
            300: '#AB98AC',
            400: '#98829A',
            500: '#856C86',
            600: '#6E5A70',
            700: '#584859',
            800: '#392F3A',
            900: '#1B161B',
            950: '#0B090B'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        }
    }
    //Your customizations, see the following sections for examples
});

export default MyPreset;