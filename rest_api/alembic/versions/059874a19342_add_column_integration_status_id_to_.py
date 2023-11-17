"""add column integration status id to customer module table

Revision ID: 059874a19342
Revises: 1cd94986a2de
Create Date: 2023-11-17 13:43:02.327349

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '059874a19342'
down_revision: Union[str, None] = '1cd94986a2de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        'customer_module',
        sa.Column('integration_status_id', sa.Integer(), nullable = False)
    )
    op.create_foreign_key(
        'integration_status_id',
        'customer_module',
        'integration_status',
        ['integration_status_id'],
        ['id']
    )

def downgrade() -> None:
    op.drop_constraint('integration_status_id', 'customer_module', type_ = 'foreignkey')
    op.drop_column('customer_module', 'integration_status_id')
