npm install --save-dev eslint@3.19.0
npm install --save-dev eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y@5.1.1
npm install --save-dev eslint-config-airbnb
echo -e '{
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env": {
        "jquery": true
    },
    "rules": {
      "no-console": 0,
      "no-else-return": 0
    }
}' > .eslintrc
