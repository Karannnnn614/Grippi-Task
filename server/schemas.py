from pydantic import BaseModel, Field
from typing import Optional


class CampaignBase(BaseModel):
    name: str = Field(
        ...,
        description="Name of the campaign",
        min_length=1,
        max_length=255,
        example="Summer Sale 2025"
    )
    
    status: str = Field(
        ...,
        description="Current status of the campaign",
        pattern="^(Active|Paused|Completed)$",
        example="Active"
    )
    
    clicks: int = Field(
        default=0,
        description="Number of clicks the campaign received",
        ge=0,
        example=1500
    )
    
    cost: float = Field(
        default=0.0,
        description="Total campaign cost in dollars",
        ge=0,
        example=250.50
    )
    
    impressions: int = Field(
        default=0,
        description="Number of times the campaign was displayed",
        ge=0,
        example=50000
    )


class CampaignCreate(CampaignBase):
    pass


class Campaign(CampaignBase):
    id: int = Field(
        ...,
        description="Unique campaign ID (auto-generated)",
        example=1
    )
    
    class Config:
        from_attributes = True
        
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Summer Sale Campaign",
                "status": "active",
                "clicks": 1500,
                "cost": 250.50,
                "impressions": 50000
            }
        }


class CampaignUpdate(BaseModel):
    name: Optional[str] = Field(
        None,
        description="Updated campaign name",
        min_length=1,
        max_length=255
    )
    
    status: Optional[str] = Field(
        None,
        description="Updated campaign status",
        pattern="^(active|paused|completed)$"
    )
    
    clicks: Optional[int] = Field(
        None,
        description="Updated click count",
        ge=0
    )
    
    cost: Optional[float] = Field(
        None,
        description="Updated campaign cost",
        ge=0
    )
    
    impressions: Optional[int] = Field(
        None,
        description="Updated impression count",
        ge=0
    )