"""create license table

Revision ID: bba5fb7ab888
Revises: 14cf4ea036a3
Create Date: 2023-10-31 18:59:26.882363

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bba5fb7ab888'
down_revision: Union[str, None] = '14cf4ea036a3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'license',
        sa.Column('name', sa.String(128), nullable=False),
        sa.Column('description', sa.String(256), nullable=True),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade')
    )


def downgrade() -> None:
    op.drop_table('license')
