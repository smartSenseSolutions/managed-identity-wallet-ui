module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // 'eslint:recommended',
        "plugin:react/recommended",
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    settings: {
        react: {
            version: 'detect', 
        },
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        " @typescript-eslint/no-explicit-any":"off",
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unused-vars':'warn',
        // '@typescript-eslint/no-unsafe-member-access': 'warn',
        'react/jsx-key': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        'import/no-unresolved': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
    }
}
