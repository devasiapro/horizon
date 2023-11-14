"""create ip whitelist table

Revision ID: 0defa0c3c52f
Revises: 52e44397fa1d
Create Date: 2023-10-31 18:06:39.938817

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0defa0c3c52f'
down_revision: Union[str, None] = '52e44397fa1d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'ip_whitelist',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('ip', sa.String(256), nullable=False),
        sa.Column('customer_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade')
    )

def downgrade() -> None:
    op.drop_table('ip_whitelist')
