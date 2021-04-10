# Express - mysql - ssh

A server which execute mysql query via ssh

## Requirement

Node.js v12

## Install

npm install

## Configration

`env.json`

#### Contents

```
{
	"conf_key": "foo",
	"conf_foo": {
		"sshHost": "",
		"sshUser": "",
		"sshPrivateKeyPath": "",
		"db": "",
		"dbHost": "",
		"dbUser": "",
		"dbPassword": ""
	},
```

## Execute

npm run watch
