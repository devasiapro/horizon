"""create top level entity table

Revision ID: 4bf266eef9fd
Revises: 3d1366ffdea8
Create Date: 2023-10-06 18:23:36.606736

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4bf266eef9fd'
down_revision: Union[str, None] = '3d1366ffdea8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'top_level_entity',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(45), nullable=False)
    )
    pass


def downgrade() -> None:
    op.drop_table('top_level_entity')
    pass
