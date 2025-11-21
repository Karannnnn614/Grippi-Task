from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, get_db, Base
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Grippi Campaign Management API",
    description="API for managing marketing campaigns with tracking metrics",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Campaign API is running!", "status": "healthy"}


@app.get("/campaigns", response_model=List[schemas.Campaign])
def get_campaigns(db: Session = Depends(get_db)):
    try:
        campaigns = db.query(models.Campaign).all()
        return campaigns
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching campaigns: {str(e)}"
        )


@app.get("/campaigns/{campaign_id}", response_model=schemas.Campaign)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    try:
        campaign = db.query(models.Campaign).filter(
            models.Campaign.id == campaign_id
        ).first()
        
        if campaign is None:
            raise HTTPException(
                status_code=404,
                detail=f"Campaign with id {campaign_id} not found"
            )
        
        return campaign
    
    except HTTPException:
        raise
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching campaign: {str(e)}"
        )


@app.post("/campaigns", response_model=schemas.Campaign, status_code=201)
def create_campaign(campaign: schemas.CampaignCreate, db: Session = Depends(get_db)):
    try:
        db_campaign = models.Campaign(**campaign.dict())
        db.add(db_campaign)
        db.commit()
        db.refresh(db_campaign)
        return db_campaign
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error creating campaign: {str(e)}"
        )


@app.put("/campaigns/{campaign_id}", response_model=schemas.Campaign)
def update_campaign(campaign_id: int, campaign: schemas.CampaignCreate, db: Session = Depends(get_db)):
    try:
        db_campaign = db.query(models.Campaign).filter(
            models.Campaign.id == campaign_id
        ).first()
        
        if db_campaign is None:
            raise HTTPException(
                status_code=404,
                detail=f"Campaign with id {campaign_id} not found"
            )
        
        for key, value in campaign.dict().items():
            setattr(db_campaign, key, value)
        
        db.commit()
        db.refresh(db_campaign)
        return db_campaign
    
    except HTTPException:
        raise
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error updating campaign: {str(e)}"
        )


@app.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    try:
        db_campaign = db.query(models.Campaign).filter(
            models.Campaign.id == campaign_id
        ).first()
        
        if db_campaign is None:
            raise HTTPException(
                status_code=404,
                detail=f"Campaign with id {campaign_id} not found"
            )
        
        db.delete(db_campaign)
        db.commit()
        return {"message": f"Campaign {campaign_id} deleted successfully"}
    
    except HTTPException:
        raise
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting campaign: {str(e)}"
        )

