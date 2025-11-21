from sqlalchemy import Column, Integer, String, Float
from database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )
    name = Column(
        String(255),
        nullable=False,
        index=True,
    )
    status = Column(
        String(50),
        nullable=False,
        default="Active",
    )
    clicks = Column(
        Integer,
        default=0,
    )
    cost = Column(
        Float,
        default=0.0,
    )
    impressions = Column(
        Integer,
        default=0,
    )

    def __repr__(self):
        return f"<Campaign(id={self.id}, name='{self.name}', status='{self.status}')>"

    @property
    def click_through_rate(self):
        if self.impressions == 0:
            return 0.0
        return (self.clicks / self.impressions) * 100

    @property
    def cost_per_click(self):
        if self.clicks == 0:
            return 0.0
        return self.cost / self.clicks
