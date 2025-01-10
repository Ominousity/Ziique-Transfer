# Ziique-Transfer
Ziique-Transfer is a small web application for making secure filetransfers, files are encrypted with a password when uploaded and can then be sent to other people who will have to type in the password to decrypt it at gain access to the files contents.

## Running the application (Backend)

A appsettings.override.json file is required for the backend to run it is placed in the following directory with the followning json structure:

```
Ziique-Transfer > Backend > API > appsettings.override.json
```
```
{
	"ConnectionStrings": {
		"DefaultConnection": "[Insert DB Connection String Here]"
	},
	"JwtSettings": {
		"Key": "[Insert JWT Secret Here]"
	}
}
```

A .env file is also required in the root of the backend project for hiding the password in the docker compose.

```
Ziique-Transfer > Backend > .env
```
```
MSSQL_SA_PASSWORD=[Insert DB Password Here]
```

To then run the backend just run the docker compose in a command line interface with the following command:

```
docker compose up --build
```

## Running the application (Frontend)

To run the frontend navigate to the following directory:

```
Ziique-Transfer > SafeTransfer-Frontend
```

Then run the following commands in a command line interface to start the frontend

```
npm i

npm run dev
```