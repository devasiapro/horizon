"""create game table

Revision ID: a4985f9511d5
Revises: 7185de8fea04
Create Date: 2023-10-06 18:57:19.873911

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a4985f9511d5'
down_revision: Union[str, None] = '7185de8fea04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'game',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('client_type_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['client_type_id'], ['client_type.id'], ondelete='cascade'),
        sa.Column('name', sa.String(256), nullable=False),
        sa.Column('game_type_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['game_type_id'], ['game_type.id'], ondelete='cascade'),
    )
    pass


def downgrade() -> None:
    op.drop_table('game')
    pass
