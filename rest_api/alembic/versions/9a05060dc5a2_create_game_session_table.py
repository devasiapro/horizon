"""create game session table

Revision ID: 9a05060dc5a2
Revises: a4985f9511d5
Create Date: 2023-10-06 19:01:00.367787

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9a05060dc5a2'
down_revision: Union[str, None] = 'a4985f9511d5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'game_session',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('currency', sa.String(32), nullable=False),
        sa.Column('player_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['player_id'], ['player.id'], ondelete='cascade'),
        sa.Column('date_played', sa.Date(), nullable=False),
        sa.Column('game_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['game_id'], ['game.id'], ondelete='cascade'),
        sa.Column('client_platform_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['client_platform_id'], ['client_platform.id'], ondelete='cascade'),
        sa.Column('total_game_bet', sa.DECIMAL(10, 2), nullable=False),
        sa.Column('total_game_win', sa.DECIMAL(10, 2), nullable=False),
        sa.Column('total_game_income', sa.DECIMAL(10, 2), nullable=False),
        sa.Column('rtp', sa.Integer(), nullable=True),
        sa.Column('number_of_spins', sa.Integer(), nullable=False)
    )
    pass


def downgrade() -> None:
    op.drop_table('game_session')
    pass
