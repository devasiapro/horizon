"""create domain whitelist table

Revision ID: c7a5fff2a24c
Revises: 0defa0c3c52f
Create Date: 2023-10-31 18:26:14.319977

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c7a5fff2a24c'
down_revision: Union[str, None] = '0defa0c3c52f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'domain_whitelist',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('domain', sa.String(256), nullable=False),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade')
    )


def downgrade() -> None:
    op.drop_table('domain_whitelist')
