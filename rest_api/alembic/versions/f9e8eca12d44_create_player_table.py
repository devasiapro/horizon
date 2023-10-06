"""create player table

Revision ID: f9e8eca12d44
Revises: 158c4133477b
Create Date: 2023-10-06 18:42:19.096044

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f9e8eca12d44'
down_revision: Union[str, None] = '158c4133477b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'player',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('username', sa.String(256), nullable=False),
        sa.Column('operator_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['operator_id'], ['operator.id'], ondelete='cascade'),
        sa.Column('player_currency', sa.String(32), nullable=False),
        sa.Column('language', sa.String(32), nullable=False),
        sa.Column('country', sa.String(64), nullable=False),
        sa.Column('player_code', sa.String(32), nullable=False)
    )
    pass


def downgrade() -> None:
    op.drop_table('player');
    pass
