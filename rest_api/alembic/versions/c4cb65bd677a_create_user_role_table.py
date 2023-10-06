"""create user role table

Revision ID: c4cb65bd677a
Revises: 
Create Date: 2023-10-06 16:04:38.782666

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'c4cb65bd677a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    op.create_table(
        'user_role',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(64), nullable=False)
    )
    pass

def downgrade() -> None:
    op.drop_table('user_role')
    pass
