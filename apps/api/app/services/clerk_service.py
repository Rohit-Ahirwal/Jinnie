import os

from clerk_backend_api import Clerk


clerk_client = Clerk(
    bearer_auth=os.getenv("CLERK_SECRET_KEY")
)


def get_clerk_user(user_id: str):

    user = clerk_client.users.get(user_id=user_id)

    email = None

    if user.email_addresses:
        email = user.email_addresses[0].email_address


    return {
        "clerk_id": user.id,
        "email": email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "avatar_url": user.image_url
    }