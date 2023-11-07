"""create office ip table

Revision ID: 5609ad8eaf7a
Revises: 6b069824ef64
Create Date: 2023-11-06 15:20:26.620687

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5609ad8eaf7a'
down_revision: Union[str, None] = '6b069824ef64'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'office_ip',
        sa.Column('id', sa.Integer(), primary_key = True),
        sa.Column('ip', sa.String(45), nullable = False),
        sa.Column('customer_id', sa.Integer(), nullable = False),
        sa.ForeignKeyConstraint(['customer_id'], ['customer_module.id'], ondelete='cascade')
    )


def downgrade() -> None:
    op.drop_table('office_ip')
