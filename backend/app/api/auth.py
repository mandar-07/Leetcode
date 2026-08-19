from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import RegisterRequest, RegisterResponse
from app.services.auth_service import create_user

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=RegisterResponse
)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        create_user(db, request)

        return RegisterResponse(
            message="User registered successfully."
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )