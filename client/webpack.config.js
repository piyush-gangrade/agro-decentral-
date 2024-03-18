import { resolve as _resolve } from 'path';

export const resolve = {
    extensions: ['.js', '.jsx'], // Add '.jsx' to the list of extensions
    alias: {
        // You can add aliases for convenience
        '@components': _resolve(__dirname, 'src/components'),
    },
};
