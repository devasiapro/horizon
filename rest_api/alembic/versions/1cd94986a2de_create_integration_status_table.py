"""create integration status table

Revision ID: 1cd94986a2de
Revises: 7679f09a4c24
Create Date: 2023-11-17 13:36:27.298568

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1cd94986a2de'
down_revision: Union[str, None] = '7679f09a4c24'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'integration_status',
        sa.Column('id', sa.Integer, primary_key = True, index = True),
        sa.Column('name', sa.String(128), nullable = False),
        sa.Column('description', sa.String(256), nullable = True)
    )

def downgrade() -> None:
    op.drop_table('integration_status')
