"""create game type table

Revision ID: 82bc644eac4b
Revises: 0226c282fd64
Create Date: 2023-10-06 18:54:25.906466

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '82bc644eac4b'
down_revision: Union[str, None] = '0226c282fd64'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'game_type',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(64))
    )
    pass


def downgrade() -> None:
    op.drop_table('game_type')
    pass
