"""create regulation table

Revision ID: 8c6045d3ae06
Revises: c7a5fff2a24c
Create Date: 2023-10-31 18:49:27.844009

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c6045d3ae06'
down_revision: Union[str, None] = 'c7a5fff2a24c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'regulation',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('name', sa.String(128), nullable=False),
        sa.Column('description', sa.String(256), nullable=True),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade')
    )

def downgrade() -> None:
    op.drop_table('regulation')
