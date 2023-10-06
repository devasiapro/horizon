"""create customer table

Revision ID: 3d1366ffdea8
Revises: a0e8fe0be035
Create Date: 2023-10-06 18:20:05.819456

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3d1366ffdea8'
down_revision: Union[str, None] = 'a0e8fe0be035'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'customer',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('brand', sa.String(256), nullable=False),
        sa.Column('operator_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['operator_id'], ['operator.id'], ondelete='cascade')
    )
    pass


def downgrade() -> None:
    op.drop_table('customer')
    pass
