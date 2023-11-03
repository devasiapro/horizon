"""create test account production table

Revision ID: 0b36503a59e0
Revises: ccd92c550bfc
Create Date: 2023-10-31 19:14:49.641797

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0b36503a59e0'
down_revision: Union[str, None] = 'ccd92c550bfc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'test_account_production',
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade'),
        sa.Column('username', sa.String(256), nullable=False),
        sa.Column('password', sa.String(256), nullable=True)
    )


def downgrade() -> None:
    op.drop_table('test_account_production')
