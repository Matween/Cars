from passlib.hash import sha256_crypt


def encrypt(password):
    return sha256_crypt.encrypt(password)


def compare(encrypted, text):
    return sha256_crypt.verify(text, encrypted)