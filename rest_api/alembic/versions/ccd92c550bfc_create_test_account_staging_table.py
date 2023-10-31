"""create test account staging table

Revision ID: ccd92c550bfc
Revises: bba5fb7ab888
Create Date: 2023-10-31 19:12:06.152359

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ccd92c550bfc'
down_revision: Union[str, None] = 'bba5fb7ab888'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'test_account_staging',
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade'),
        sa.Column('username', sa.String(256), nullable=False),
        sa.Column('password', sa.String(256), nullable=True)
    )


def downgrade() -> None:
    op.drop_table('test_account_staging')
