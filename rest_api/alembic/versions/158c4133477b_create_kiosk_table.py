"""create kiosk table

Revision ID: 158c4133477b
Revises: 4bf266eef9fd
Create Date: 2023-10-06 18:29:09.867591

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '158c4133477b'
down_revision: Union[str, None] = '4bf266eef9fd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'kiosk',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('brand', sa.String(256), nullable=False),
        sa.Column('operator_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['operator_id'], ['operator.id'], ondelete='cascade'),
        sa.Column('top_level_entity_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['top_level_entity_id'], ['top_level_entity.id'], ondelete='cascade')
    )
    pass


def downgrade() -> None:
    op.drop_table('kiosk')
    pass
