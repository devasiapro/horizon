"""create market jurisdiction table

Revision ID: 14cf4ea036a3
Revises: 8c6045d3ae06
Create Date: 2023-10-31 18:57:58.600776

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '14cf4ea036a3'
down_revision: Union[str, None] = '8c6045d3ae06'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'market_jurisdiction',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(128), nullable=False),
        sa.Column('description', sa.String(256), nullable=True),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade')
    )


def downgrade() -> None:
    op.drop_table('market_jurisdiction')
