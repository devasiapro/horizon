"""create customer currency table

Revision ID: 52e44397fa1d
Revises: ff9b85d8ebeb
Create Date: 2023-10-31 18:02:21.270480

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '52e44397fa1d'
down_revision: Union[str, None] = 'ff9b85d8ebeb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'customer_currency',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade'),
        sa.Column('currency_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['currency_id'], ['currency.id'], ondelete='cascade'),
        sa.Column('is_default', sa.Boolean(), nullable=False, server_default=sa.false())
    )


def downgrade() -> None:
    op.drop_table('customer_currency')
