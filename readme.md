# Brezaa Backend Test API

#### /users

##### GET

Returns JSON of all users in form:

[{email, password, username, firstName, lastName, address, typeOfUser, profession (optional), longitude, latitude},...]

---

#### /users/:id\<int>

##### GET

Returns JSON of single user in form:

{email, password, username, firstName, lastName, address, typeOfUser, profession (optional), longitude, latitude}

---

#### /users/signup

##### POST

###### Required Body Fields:

email, password, username, firstName, lastName, address, typeOfUser, profession, longitude, latitude

###### Returned Fields:

{id, email, password, username, firstName, lastName, address, typeOfUser, profession, longitude, latitude}

---

#### /users/login

##### POST

###### Required Body Fields:

email, password

Sets session cookie for user, to allow for submitting reviews.

---

#### /review/?sellerId=\<int>

##### POST

###### Required Body Fields:

reviewValue, comment

---

#### /getAllSellers

##### GET

###### Returned Fields:

{id, email, password, username, firstName, lastName, address, typeOfUser, profession, longitude, latitude}

Returns all users where profession isn't null.

---

#### getSellerReviews/?sellerId=\<int>

##### GET

###### Returned Fields:

[{sellerId, reviewValue, comment},...]

Returns list of all reviews for query seller Id.
