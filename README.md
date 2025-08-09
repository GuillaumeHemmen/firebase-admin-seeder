# Firebase Admin Seeder

A simple CLI tool for seeding initial user roles in Firebase via the Firebase Admin SDK.


## Project Hosting

The official repository for this project is hosted on my personal [Forgejo instance](https://git.van-hemmen.com/GuillaumeHemmen/firebase-admin-seeder).

For convenience, the project is also mirrored to:

* [GitHub](https://github.com/GuillaumeHemmen/firebase-admin-seeder)
* [GitLab](https://gitlab.com/GuillaumeHemmen/firebase-admin-seeder)

> **Note:** Bug reports and feature requests are only accepted on the Forgejo repository.
> All links in this README point to the Forgejo instance.


## Purpose

When using Firebase custom claims for secure role management, you must manually seed the first account with the required roles.
This project provides a straightforward CLI script to automate that process.


## Getting Started

### 1. Prerequisites

* [Node.js](https://nodejs.org/en/) (LTS version 22 recommended at the time of writing)
* A Firebase project with a service account key file


### 2. Downloading the Project

Clone the repository:

```bash
git clone https://git.van-hemmen.com/GuillaumeHemmen/firebase-admin-seeder.git
```

Alternatively, download it as a `.zip` or `.tar.gz` archive from the repository page.


### 3. Installing Dependencies

Navigate to the project folder and install dependencies:

```bash
cd firebase-admin-seeder
npm install
```


### 4. Preparing the Service Account File

1. Download a **service account key file** from your Firebase console.
    * Go to **Project Settings** → **Service Accounts** → **Generate New Private Key**.
2. Save the file in the project root directory as:

```
./service-account.json
```


### 5. Running the Script

Run the bootstrap command, replacing `<user-UID>` with the UID of the target user:

```bash
npm run bootstrap <user-UID>
```

You can find the UID in the Firebase Console under **Authentication**.

The script will assign the `role` custom claim with the value:

```json
["admin"]
```


### 6. Next Steps

After seeding your first admin user, you can continue building your application.

You may also want to check out
[firebase-customclaim-api](https://git.van-hemmen.com/GuillaumeHemmen/firebase-customclaim-api) —
a sample project for managing custom claim roles via your Firebase project UI.


## Reporting Issues

Please report bugs and request features exclusively via the
[Forgejo issue tracker](https://git.van-hemmen.com/GuillaumeHemmen/firebase-admin-seeder/issues).


## Contributing

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.


## License

This project is licensed under the terms described in [LICENSE](LICENSE).
